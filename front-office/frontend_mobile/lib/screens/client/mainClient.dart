import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/auth/auth_screen.dart';
import 'package:frontend_mobile/screens/client/pages/book_details.dart';
import 'package:frontend_mobile/screens/client/pages/cartItems.dart';
import 'package:frontend_mobile/screens/client/pages/categories.dart';
import 'package:frontend_mobile/screens/client/pages/category_books.dart';
import 'package:frontend_mobile/screens/client/pages/homePage.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainClient extends StatefulWidget {
  const MainClient({super.key});

  @override
  State<MainClient> createState() => _MainClientState();
}

class _MainClientState extends State<MainClient> {
  final Future<SharedPreferences> _prefs = SharedPreferences.getInstance();
  int _selectedIndex = 0;

  final List<Widget> _pages = const [HomePage(), Categories(), CartPage()];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    Navigator.of(context).pop();
  }

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
                onTap: () {
                  _onItemTapped(0);
                },
              ),
              ListTile(
                leading: Icon(Icons.category),
                title: Text('Categories'),
                onTap: () {
                  _onItemTapped(1);
                },
              ),
              ListTile(
                leading: Icon(Icons.shopping_cart),
                title: Text('Cart'),
                onTap: () {
                  _onItemTapped(2);
                },
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
        body: IndexedStack(
          index: _selectedIndex,
          children: _pages,
        ));
  }
}
