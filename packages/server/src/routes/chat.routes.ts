import { Router, Request, Response } from 'express';
import { asi1 } from '../services/asi1-client.js';
import { defaultLimiter } from '../middleware/rate-limit.middleware.js';
import type { ASI1Message, ChatRequest } from '@asipilot/shared';

const router = Router();

router.post('/', defaultLimiter, async (req: Request, res: Response) => {
  try {
    const { messages, message, history = [], stream = true } = req.body;

    let chatMessages = messages;
    if (!chatMessages) {
      if (!message) {
        return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Message is required' } });
      }
      chatMessages = [
        {
          role: 'system',
          content: 'You are AsiPilot AI, an expert frontend development assistant. You help with HTML, CSS, JavaScript, TypeScript, React, Vue, Svelte, Next.js, Tailwind CSS, and all frontend technologies. Provide clear, concise, and accurate code with explanations. When showing code, use appropriate language tags in code blocks.',
        },
        ...history,
        { role: 'user', content: message },
      ];
    }

    if (stream) {
      // Do not set SSE headers until the upstream stream is ready; if ASI-1 fails first,
      // we must return JSON 500 — otherwise the client gets a broken SSE body and shows a generic error.
      const generator = asi1.chatStream(chatMessages);
      try {
        for await (const token of generator) {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
          }
          res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: token } }] })}\n\n`);
        }
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
        }
        res.write('data: [DONE]\n\n');
        res.end();
      } catch (streamErr) {
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            error: { code: 'CHAT_ERROR', message: (streamErr as Error).message },
          });
        } else {
          res.end();
        }
      }
    } else {
      const response = await asi1.chat(chatMessages);
      res.json({ success: true, data: response });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: { code: 'CHAT_ERROR', message: (error as Error).message } });
    } else {
      res.end();
    }
  }
});

export { router as chatRoutes };
