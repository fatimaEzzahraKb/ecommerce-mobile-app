import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:frontend_mobile/controllers/orders_controller.dart';

class OrdersPage extends StatefulWidget {
  const OrdersPage({Key? key}) : super(key: key);

  @override
  State<OrdersPage> createState() => _OrdersPageState();
}

class _OrdersPageState extends State<OrdersPage> {
  final OrderController orderController = Get.put(OrderController());

  @override
  void initState() {
    super.initState();
    orderController.fetchOrders();
  }

  String formatDate(String? rawDate) {
    if (rawDate == null) return 'N/A';
    try {
      final date = DateTime.parse(rawDate);
      String twoDigits(int n) => n.toString().padLeft(2, '0');

      final day = twoDigits(date.day);
      final month = twoDigits(date.month);
      final year = date.year;

      final hour = twoDigits(date.hour);
      final minute = twoDigits(date.minute);

      return '$day/$month/$year $hour:$minute';
    } catch (_) {
      return 'N/A';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mes commandes')),
      body: Obx(() {
        if (orderController.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        } else if (orderController.orders.isEmpty) {
          return const Center(child: Text('Aucune commande trouvée.'));
        } else {
          return ListView.builder(
            itemCount: orderController.orders.length,
            itemBuilder: (context, index) {
              final order = orderController.orders[index];
              return Card(
                margin: const EdgeInsets.all(10),
                elevation: 3,
                child: ListTile(
                  title: Text('Commande n°${order['id']}'),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Montant total: ${order['total']} DH'),
                      Text('Status: ${order['status']}'),
                      Text('Date: ${formatDate(order['createdAt'])}'),
                    ],
                  ),
                ),
              );
            },
          );
        }
      }),
    );
  }
}
