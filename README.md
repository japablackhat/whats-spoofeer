whats-spoofing
Spoofer de respostas para mensagens do WhatsApp.

Instalação

$ git clone https://github.com/japablackhat/whats-spoofeer
$ cd whats-spoofing
$ mkdir -p data && mkdir -p db && mkdir -p history
$ go mod download
$ go build
Uso


$ ./whats-spoofing

Assim que aparecer um código QR no terminal, escaneie-o com o aplicativo do WhatsApp, como ao fazer login no WhatsApp Web. Isso é necessário para obter o token de sessão e enviar mensagens.

Depois disso, quando você vir no seu terminal "Listening on localhost:8080", abra uma aba no navegador e vá para http://localhost:8080.

Você verá um formulário para enviar mensagens. Preencha o formulário com o número de telefone (com o prefixo internacional, mas sem o "+") para o qual você deseja enviar a mensagem, o número do usuário a ser falsificado (o número que aparecerá na mensagem), a mensagem de resposta falsificada e a resposta, enviada por você.

Se quiser enviar uma mensagem falsificada para um grupo, basta copiar e colar o ID do grupo (que você pode obter abaixo do formulário do remetente) no primeiro campo de número de telefone.

Clique no botão "Enviar" e a mensagem será enviada.

Divirta-se spoofando! 🎉

Use esta ferramenta com responsabilidade! Não sou responsável pelo uso indevido desta ferramenta.

Eu fiz um fork e atualizei este projeto com uma versão mais recente do Whatsmeow e uma interface web. O projeto original foi deletado do Github, mas foi criado por @lichti.
