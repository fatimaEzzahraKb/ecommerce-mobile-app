import 'dart:convert';

import 'package:frontend_mobile/utils/api_endpoints.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ChatBotController extends GetxController {
  var messages = [].obs;
  var answers = [].obs;
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  Future<void> getConversation() async {
    try {
      final SharedPreferences? prefs = await _prefs;
      int? user_id = await prefs?.getInt('user_id');
      var headers = {'Content-Type': "application/json"};
      var url = Uri.parse(ApiEndpoints.baseUrl +
          ApiEndpoints.chatBotEndPoints.getConversation(user_id));
      http.Response response = await http.get(url, headers: headers);
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        print(json['message']);
        messages.value =
            List<String>.from(json['messages'].map((msg) => msg['content']));

        answers.value =
            List<String>.from(json['answers'].map((ans) => ans['content']));
      } else {
        final error = jsonDecode(response.body);
        throw error['message'] ?? error.toString();
      }
    } catch (error) {
      Get.back();
      print("Error when getting the conversation  $error");
    }
  }

  Future<void> sendMessageToBot(String messageContent) async {
    try {
      final SharedPreferences? prefs = await _prefs;
      int? user_id = await prefs?.getInt('user_id');
      var headers = {'Content-Type': "application/json"};

      messages.add(messageContent);

      answers.add("Typing...");

      var body = jsonEncode({'content': messageContent});
      var url = Uri.parse(ApiEndpoints.baseUrl +
          ApiEndpoints.chatBotEndPoints.sendMessage(user_id));
      http.Response response =
          await http.post(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);
        print(jsonResponse['response']);
        answers.removeLast();
        final answerContent = jsonResponse['response'];
        answers.add(answerContent);
        print("Bot Responded with: ${answerContent}");
      } else {
        final error = jsonDecode(response.body);
        throw error['message'] ?? error.toString();
      }
    } catch (error) {
      Get.back();
      print("Error when getting the conversation  $error");
    }
  }
}
