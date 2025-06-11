import 'package:flutter/material.dart';
import 'package:frontend_mobile/controllers/login_controller.dart';
import 'package:frontend_mobile/controllers/register_controller.dart';
import 'package:frontend_mobile/screens/auth/widgets/input_files.dart';
import 'package:frontend_mobile/screens/auth/widgets/submit_button.dart';
import 'package:get/get.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  RegisterController registerController = Get.put(RegisterController());

  LoginController loginController = Get.put(LoginController());

  var isLogin = false.obs;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(36),
          child: Center(
            child: Obx(
              () => Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    height: 30,
                  ),
                  Container(
                    child: Text(
                      'WELCOME',
                      style: TextStyle(
                          fontSize: 30,
                          color: Colors.black,
                          fontWeight: FontWeight.w400),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      MaterialButton(
                        color: !isLogin.value ? Colors.white : Colors.amber,
                        onPressed: () {
                          isLogin.value = false;
                        },
                        child: Text('Register'),
                      ),
                      MaterialButton(
                        color: !isLogin.value ? Colors.white : Colors.amber,
                        onPressed: () {
                          isLogin.value = true;
                        },
                        child: Text('Login'),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 80,
                  ),
                  isLogin.value ? loginWidget() : registerWidget()
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget registerWidget() {
    return Column(
      children: [
        InputTextFieldWidget(registerController.nomController, 'nom'),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(registerController.prenomController, 'prénom'),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(registerController.emailController, 'email'),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(registerController.villeController, 'ville'),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(registerController.paysController, 'pays'),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(registerController.mdpController, 'Password'),
        SizedBox(
          height: 20,
        ),
        SubmitButton(
            onPressed: () => registerController.registerWitEmail(),
            title: "Register")
      ],
    );
  }

  Widget loginWidget() {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(loginController.emailController, "Email"),
        SizedBox(
          height: 20,
        ),
        InputTextFieldWidget(loginController.mdpController, 'Password'),
        SizedBox(
          height: 20,
        ),
        SubmitButton(
            onPressed: () => loginController.loginWithEmail(), title: "Login")
      ],
    );
  }
}
