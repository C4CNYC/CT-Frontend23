"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatgptTutor = exports.aiAssistantId = void 0;
const chatgpttutor_1 = require("chatgpttutor");
const aiAssistantId = "SUPPORT";
exports.aiAssistantId = aiAssistantId;
const chatgptTutor = new chatgpttutor_1.ChatgptTutor();
exports.chatgptTutor = chatgptTutor;
chatgptTutor.initializeChatgptTutor(process.env["NEXT_PUBLIC_OPENAI_API_KEY"], "NONE");
//# sourceMappingURL=chatgptTutor.js.map