#los nombres de los archivos y eso puede parecer arcaico pero es para poder usarlo con github pages
from jinja2 import Environment, FileSystemLoader
from os import listdir
renderizar = listdir("templates")
renderizar.remove("root.html")
with open("textos\\parrafos_index.txt",encoding="utf8") as archivo:
    output = ""
    for linea in archivo.read().splitlines():
        output = f"{output}<p class=\"texto\">{linea}</p>\n"
    open("textos\\parrafos_index_renderizado.txt",mode="w",encoding="utf8").write(output)

templateLoader = FileSystemLoader(searchpath="./templates")
templateEnv = Environment(loader=templateLoader)
for template in renderizar:
    outputText = templateEnv.get_template(template).render()  # this is where to put args to the template renderer
    with open(f"docs\\{template}",mode="w",encoding="utf8") as final:
        final.write(outputText)
print("Templates renderizadas")