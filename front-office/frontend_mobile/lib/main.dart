import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:frontend_mobile/screens/auth/auth_screen.dart';
import 'package:frontend_mobile/screens/client/mainClient.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {

   //Initialiser la liaison Flutter
     WidgetsFlutterBinding.ensureInitialized();   
     //Attribuer une clé publiable à flutter_stripe 
     Stripe.publishableKey = 
      'pk_test_51RglM02c8esCaOYGs2xPkgFRAtxffSMqeLY30gT9xdCRhlkh7MkCdN92s8hTdINmBp82orc4zyDDvAzyt2HLcfq500xgHF7OqV' ;  

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Widget? _initialScreen;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

    setState(() {
      _initialScreen = isLoggedIn ? const MainClient() : const AuthScreen();
    });
  }

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: ThemeData.light(useMaterial3: true),
      home: _initialScreen ??
          const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          ),
    );
  }
}
