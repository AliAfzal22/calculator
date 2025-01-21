Context Free Grammar:

S  → E

E  → E "+" T
    | E "-" T
    | T

T  → T "*" F
    | T "/" F
    | F

F  → F "^" P
    | P

P  → P "!"
    | "(" E ")"
    | FUNC "(" E ")"
    | N

N  → NUMBER
    | "π"
    | "e"

NUMBER → DIGIT_SEQUENCE
       | DIGIT_SEQUENCE "." DIGIT_SEQUENCE

DIGIT_SEQUENCE → DIGIT DIGIT_SEQUENCE
               | DIGIT

FUNC → "ln"
     | "Tan"
     | "Sin"
     | "Cos"

DIGIT → "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"