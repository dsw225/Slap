import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:english_words/english_words.dart';
import '../models/NumberWordPair.dart';
import 'dart:developer' as developer;

// method for trying out a long-running calculation
Future<List<String>> doSomeLongRunningCalculation() async {
  // return simpleLongRunningCalculation();
  return getWebData(); // we'll try this next.
}

Future<List<String>> simpleLongRunningCalculation() async {
  await Future.delayed(Duration(seconds: 5)); // wait 5 sec
  List<String> myList = List.generate(100, 
                        (index) => WordPair.random().asPascalCase,
                        growable: true);
  return myList;
  // return ['x', 'y', 'z']; // you can hard code the result if you want it more predictable
}

// be sure to add "import 'dart:convert';" at the top of the file

Future<List<String>> getWebData() async {
  developer.log('Making web request...');
  // var url = Uri.http('www.cse.lehigh.edu', '~spear/courses.json');
  // var url = Uri.parse('http://www.cse.lehigh.edu/~spear/courses.json');
  var url = Uri.parse('http://www.cse.lehigh.edu/~spear/5k.json');
  // var url = Uri.parse('https://jsonplaceholder.typicode.com/albums/1');
  var headers = {"Accept": "application/json"};  // <String,String>{};

  var response = await http.get(url, headers: headers);  

  developer.log('Response status: ${response.statusCode}');
  developer.log('Response headers: ${response.headers}');
  developer.log('Response body: ${response.body}');

  final List<String> returnData;
  if (response.statusCode == 200) {
    // If the server did return a 200 OK response, then parse the JSON.
    var res = jsonDecode(response.body);
    print('json decode: $res');

    if( res is List ){
      returnData = (res as List<dynamic>).map( (x) => x.toString() ).toList();
    }else if( res is Map ){
      returnData = <String>[(res as Map<String,dynamic>).toString()];
    }else{
      developer.log('ERROR: Unexpected json response type (was not a List or Map).');
      returnData = List.empty();
    }
  }else{
    throw Exception('Failed to retrieve web data (server returned ${response.statusCode})');
  }

  return returnData;
}

Future<List<NumberWordPair>> fetchNumberWordPairs() async {
  final response = await http
      .get(Uri.parse('http://www.cse.lehigh.edu/~spear/5k.json'));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response, then parse the JSON.
    final List<NumberWordPair> returnData;
    var res = jsonDecode(response.body);
    print('json decode: $res');

    if( res is List ){
      returnData = (res as List<dynamic>).map( (x) => NumberWordPair.fromJson(x) ).toList();
    }else if( res is Map ){
      returnData = <NumberWordPair>[NumberWordPair.fromJson(res as Map<String,dynamic>)];
    }else{
      developer.log('ERROR: Unexpected json response type (was not a List or Map).');
      returnData = List.empty();
    }
    return returnData;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Did not receive success status code from request.');
  }
}