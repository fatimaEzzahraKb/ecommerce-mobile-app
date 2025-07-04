import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:frontend_mobile/controllers/cartItems_controller.dart';
import 'package:frontend_mobile/controllers/orders_controller.dart';

class CartPage extends StatefulWidget {
  const CartPage({Key? key}) : super(key: key);

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  bool _userConnected = true;

  @override
  void initState() {
    super.initState();
    _checkAndLoadCart();
  }

  Future<void> _checkAndLoadCart() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('user_id');
    if (userId != null) {
      setState(() => _userConnected = true);
      await cartController.fetchCartItems();
    } else {
      setState(() => _userConnected = false);
    }
  }

  void _showOrderForm() {
    final TextEditingController telephoneController = TextEditingController();
    final TextEditingController adresseController = TextEditingController();
    final TextEditingController villeController = TextEditingController();

    Get.defaultDialog(
      title: "Passer la commande",
      content: Column(
        children: [
          TextField(
            controller: telephoneController,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(
              labelText: 'Téléphone',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: adresseController,
            decoration: const InputDecoration(
              labelText: 'Adresse',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: villeController,
            decoration: const InputDecoration(
              labelText: 'Ville',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () async {
              final tel = telephoneController.text.trim();
              final addr = adresseController.text.trim();
              final city = villeController.text.trim();

              if (tel.isEmpty || addr.isEmpty || city.isEmpty) {
                Get.snackbar('Erreur', 'Veuillez remplir tous les champs');
                return;
              }

              final totalAmount = cartController.getTotal();

              final successOrder = await orderController.sendOrder(
                telephone: tel,
                adresse: addr,
                ville: city,
                total: totalAmount,
                products: List<Map<String, dynamic>>.from(
                    cartController.cartItems.toList()),
              );
              if (successOrder) {
                Get.back(); // Fermer le dialogue
                Get.snackbar('Succès', 'Commande passée avec succès');
                cartController.cartItems.clear();
              } else {
                Get.snackbar(
                    'Erreur', 'Erreur lors de la création de la commande');
              }
            },
            child: const Text("Confirmer la commande"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_userConnected) {
      return Scaffold(
        appBar: AppBar(title: const Text("Votre panier")),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Vous n'êtes pas connecté."),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Get.toNamed('/login'),
                child: const Text("Se connecter"),
              )
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Obx(() => Text(
            'Votre panier - Total: ${cartController.getTotal().toStringAsFixed(2)} DH')),
        centerTitle: true,
      ),
      body: Obx(() {
        if (cartController.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        } else if (cartController.cartItems.isEmpty) {
          return const Center(child: Text('Panier vide'));
        } else {
          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  itemCount: cartController.cartItems.length,
                  itemBuilder: (context, index) {
                    final book = cartController.cartItems[index];
                    return Card(
                      margin: const EdgeInsets.symmetric(
                          vertical: 8, horizontal: 16),
                      child: ListTile(
                        title: Text(book['titre'] ?? 'Titre inconnu'),
                        subtitle: Text(
                            'Quantité : ${book['cartItems']?['quantite'] ?? "0"}'),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () {
                                final TextEditingController qtyController =
                                    TextEditingController(
                                  text: book['cartItems']?['quantite']
                                          ?.toString() ??
                                      '1',
                                );

                                Get.defaultDialog(
                                  title: "Modifier la quantité",
                                  content: Column(
                                    children: [
                                      TextField(
                                        controller: qtyController,
                                        keyboardType: TextInputType.number,
                                        decoration: const InputDecoration(
                                          labelText: "Nouvelle quantité",
                                          border: OutlineInputBorder(),
                                        ),
                                      ),
                                      const SizedBox(height: 20),
                                      ElevatedButton(
                                        onPressed: () {
                                          final newQty =
                                              int.tryParse(qtyController.text);
                                          if (newQty != null && newQty > 0) {
                                            cartController.updateQuantity(
                                              bookId: book['id'],
                                              quantity: newQty,
                                            );
                                            Get.back();
                                          } else {
                                            Get.snackbar(
                                                "Erreur", "Quantité invalide");
                                          }
                                        },
                                        child: const Text("Enregistrer"),
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () {
                                cartController.removeFromCart(book['id']);
                              },
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _showOrderForm,
                    style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.all(16)),
                    child: const Text("Commander maintenant"),
                  ),
                ),
              )
            ],
          );
        }
      }),
    );
  }
}
