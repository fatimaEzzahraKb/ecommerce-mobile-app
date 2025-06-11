class ApiEndpoints {
  static final String baseUrl = "http://localhost:5000/";
  static _AuthEndPoints authEndPoints = _AuthEndPoints();
}

class _AuthEndPoints {
  final String registerUser = 'authentication/register';
  final String loginUser = 'authentication/login';
}
