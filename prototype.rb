# expected: [ "0", "input", "range", "fn[x y + ]", "fold" ]
$arities = {
    "range" => 1,
    "input" => 1,
    "fold" => 2,
    "map" => 2,
    "+" => 2,
    "-" => 2,
    "*" => 2,
    "/" => 2,
    "=" => 2,
    "%" => 2,
}
def compile_help(tokens, index=0)
    context = :data
    stack = []
    evaluating = nil
    arity = 1
    while index < tokens.size
        token = tokens[index]
        p [context, arity, token, stack]
        
        case context
        when :data
            case token
            when /^(\d+)$/, "x", "y"
                stack << token
            when "fn"
                # TODO
                index += 1
                substack, index = compile_help tokens, index
                puts "FN sub: #{substack}"
                stack << substack
            else
                STDERR.puts "Invalid data: #{token}"
                exit
            end
        when :op
            if $arities[token]
                arity = $arities[token]
                evaluating = token
            elsif token == "."
                return stack, index
            else
                STDERR.puts "Invalid op: #{token}"
                exit
            end
        end
        
        arity -= 1
        if arity <= 0
            context = :op
            stack << evaluating unless evaluating.nil?
        else
            context = :data
        end
        
        index += 1
    end
    
    return stack, index
end
def compile(tokens)
    compile_help(tokens)[0]
end
def showc(c)
    "[" + c.map { |e| Array === e ? showc(e) : e } * " " + "]"
end
puts showc compile %w(
    0 input range fold fn
        0 input % y = 0 * y + x
    .
)
