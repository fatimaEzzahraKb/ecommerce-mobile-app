class ApiEndpoints {
  static final String baseUrl = "http://192.168.1.39:5000/";
  static final String imagesBaseUrl = "http://192.168.1.39:3000/uploads/";

  static _AuthEndPoints authEndPoints = _AuthEndPoints();
  static _BooksEndPoints booksEndPoints = _BooksEndPoints();
  static _CategoriesEndPoints categoriesEndPoints = _CategoriesEndPoints();
  static _ChatBotEndPoints chatBotEndPoints = _ChatBotEndPoints();
}

class _AuthEndPoints {
  final String registerUser = 'authentication/register';
  final String loginUser = 'authentication/login';
}

class _BooksEndPoints {
  final String getAllBooks = "books";
  String getOneBook(int id) => "books/$id";
}

class _CategoriesEndPoints {
  final String getAllCategories = "categories";
  String getOneCategoryBooks(int id) => "categories/$id";
}

class _ChatBotEndPoints {
  String getConversation(int? id) => "chatbot-conv/$id";
  String sendMessage(int? id) => "send-to-chat/$id";
}
