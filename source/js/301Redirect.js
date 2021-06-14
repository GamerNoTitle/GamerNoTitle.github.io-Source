url = window.location.href
whether = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i)
if(whether == True){
    result = String(url).replace(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i,'posts')
    window.location = result
}
