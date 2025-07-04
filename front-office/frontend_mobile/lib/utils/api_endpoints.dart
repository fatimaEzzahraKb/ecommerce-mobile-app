class ApiEndpoints {
  static final String baseUrl = "http://192.168.1.101:5000/";
  static final String imagesBaseUrl = "http://192.168.1.101:3000/uploads/";
  static _AuthEndPoints authEndPoints = _AuthEndPoints();
  static _BooksEndPoints booksEndPoints = _BooksEndPoints();
  static _CategoriesEndPoints categoriesEndPoints = _CategoriesEndPoints();
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
