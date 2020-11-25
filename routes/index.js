const router = require("express").Router()

router.get('/',(req,res)=>{
    const antip = [
        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },

        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
        {
            err_num: 1,
            code:' #include <stdio.h>\n int main(){\n int x;\n scanf("%d",&x);\n printf("%d",x);\n return 0\n}',
            err:"erro de identação",
            err_nom:"indentação",
        },
    ]
    res.render("index",{antip:antip})
})

module.exports = router