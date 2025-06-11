import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/auth/auth_screen.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Column(
          children: [
            Container(
              height: 200,
              color: const Color.fromARGB(255, 253, 229, 232),
              width: double.infinity,
              child: Center(
                child: Image.asset(
                  "assets/logo.png",
                  width: 200,
                  height: 200,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Home'),
            ),
            ListTile(
              leading: Icon(Icons.category),
              title: Text('Categories'),
            ),
            ListTile(
              leading: Icon(Icons.shopping_cart),
              title: Text('Cart'),
            ),
            ListTile(
              leading: Icon(Icons.inventory_2),
              title: Text('Orders'),
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Logout'),
              onTap: () async {
                final SharedPreferences? prefs = await _prefs;
                prefs?.clear();
                Get.offAll(AuthScreen());
              },
            )
          ],
        ),
      ),
      appBar: AppBar(
        actions: [
          TextButton(
              onPressed: () async {
                final SharedPreferences? prefs = await _prefs;
                prefs?.clear();
                Get.offAll(AuthScreen());
              },
              child: Center(
                  child: Image.asset(
                "assets/logo_img.png",
                width: 50,
                height: 50,
                fit: BoxFit.cover,
              )))
        ],
      ),
      body: Center(
        child: Column(
          children: [
            Text("Welcome home"),
            TextButton(
                onPressed: () async {
                  final SharedPreferences? prefs = await _prefs;
                  print(prefs?.get('token'));
                },
                child: Text("print token"))
          ],
        ),
      ),
    );
  }
}
