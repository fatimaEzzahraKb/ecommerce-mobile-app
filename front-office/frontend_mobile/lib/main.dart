import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/auth/auth_screen.dart';
import 'package:frontend_mobile/screens/home.dart';
import 'package:get/get.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        theme: ThemeData.light(useMaterial3: true), home: AuthScreen());
  }
}
