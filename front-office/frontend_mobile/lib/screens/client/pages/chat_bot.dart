import 'package:flutter/material.dart';
import 'package:chat_bubbles/chat_bubbles.dart';
import 'package:frontend_mobile/controllers/BotConroller.dart';
import 'package:get/get.dart';

class ChatBot extends StatefulWidget {
  const ChatBot({super.key});

  @override
  State<ChatBot> createState() => _ChatBotState();
}

class _ChatBotState extends State<ChatBot> {
  final ChatBotController chatBotController = ChatBotController();

  @override
  void initState() {
    super.initState();
    chatBotController.getConversation();
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      var messages = chatBotController.messages;
      var answers = chatBotController.answers;
      if (messages.isEmpty) {
        return Container(child: Text("No messages Yet"));
      }
      List<ChatMessage> allMessages = [];
      for (int i = 0; i < messages.length; i++) {
        allMessages.add(ChatMessage(content: messages[i], isUser: true));
        if (i < answers.length) {
          allMessages.add(ChatMessage(content: answers[i], isUser: false));
        }
      }

      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: allMessages.length,
            separatorBuilder: (context, index) => const Divider(height: 24),
            itemBuilder: (context, index) {
              var message = allMessages[index];
              var messagesCount = allMessages.length;
              return BubbleSpecialThree(
                text: message.content,
                color: message.isUser
                    ? Color.fromARGB(255, 175, 175, 175)
                    : Color.fromARGB(255, 255, 255, 255),
                tail: true,
                isSender: message.isUser,
                textStyle: TextStyle(
                    color: const Color.fromARGB(255, 4, 4, 4), fontSize: 16),
              );
            },
          ),
        ),
        BubbleSpecialThree(
          text: 'Added iMessage shape bubbles',
          color: Color(0xFF1B97F3),
          tail: false,
          textStyle: TextStyle(color: Colors.white, fontSize: 16),
        ),
        BubbleSpecialThree(
          text: "Thanks",
          color: Color(0xFFE8E8EE),
          tail: true,
          isSender: false,
        ),
        MessageBar(
          onSend: (value) {
            if (value.trim().isNotEmpty) {
              chatBotController.sendMessageToBot(value);
              
            }
          },
        ),
      ]);
    });
  }
}

class ChatMessage {
  final String content;
  final bool isUser;

  ChatMessage({required this.content, required this.isUser});
}
