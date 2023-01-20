def insert_sorted!(base, key, value)
  insert_index = base.bsearch_index { |sym, prob| prob >= value }
  insert_index ||= -1
  base.insert(insert_index, [ key, value ])
end

# interpret tree
def interpret(tree, build="")
    if String === tree
        # if leaf
        [ [tree, build] ]
    else
        # if tree
        left, right = tree
        interpret(left, build + "0") + interpret(right, build + "1")
    end
end

claves = [
  # data
  %w(0 1 2 3 4 5 t i x y z { \( o v),
  # ops
  %w(Y Z r + - / * % = c } \) ;),
  # types
  %w(N B F S L)
]

codes = [
  # sum of divisors (6.25b)
  "iNZr/{z%y=0*y+x",
  # sum of list (2.75b)
  "iLN/{x+y",
  # fibonacci (Nth) (5.5b)
  "iN*{y+(zY)Z};z",
  # n * n reversed (3.75b)
  "iNZcSrcN*z"
  
]
unused = [
  # fibonacci (list of first N) (4.125b)
  "iN*{y+(zY)Z",
  # fibonacci (Nth) (5.875b)
  "iN*{y+(zY)Z}/{y",
]

total_code = {}
# obtain probabilities
claves.each { |symbols|
  probabilities = {}
  symbols.each { |sym| probabilities[sym] = 0 }
  total = 0
  codes.each { |code|
    code.chars.each { |c|
      c = "}" if c == ")" # alias
      probabilities[c] += 1 if symbols.index c
      total += 1
    }
  }
  prio_queue = []
  probabilities.keys.each { |key|
    value = probabilities[key]
    # value /= total.to_f
    insert_sorted! prio_queue, key, value
  }
  
  # generate tree
  until prio_queue.size == 1
    first, second, *prio_queue = prio_queue
    sum_key = [ first[0], second[0] ]
    sum_prob = first[1] + second[1]
    insert_sorted! prio_queue, sum_key, sum_prob
  end
  tree, = prio_queue[0]
  p tree
  puts interpret(tree).map { |k,v|
    total_code[k] = v
    "#{k}\t#{v}"
  }
}

codes.each { |prog|
  rep = prog.chars.map { |c| total_code[c] } 
  size = rep.join.size
  puts prog
  puts rep.join "│"
  puts "#{size} bits, #{size / 8.0} bytes"
  puts
}