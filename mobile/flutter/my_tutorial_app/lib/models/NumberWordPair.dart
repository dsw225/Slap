/// Create object from data like: http://www.cse.lehigh.edu/~spear/5k.json
class NumberWordPair {
  /// The string representation of the number
  final String str; 
  /// The int representation of the number
  final int num;

  const NumberWordPair({
    required this.str,
    required this.num,
  });

  factory NumberWordPair.fromJson(Map<String, dynamic> json) {
    return NumberWordPair(
      str: json['str'],
      num: json['num'],
    );
  }

  Map<String, dynamic> toJson() => {
    'str': str,
    'num': num,
  };
}