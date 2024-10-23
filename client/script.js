// Função de delay em milissegundos
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para buscar e exibir os grupos
const fetchGids = async () => {
    try {
        const res = await fetch("/get-groups");
        let data = (await res.text()).split("\n").map(e => e.trim());

        data = data
            .filter(e => e.length > 0)
            .map(e => {
                let split = e.split(":");
                const id = split.pop();
                const name = split.join(":");

                return `<div class="group-container"><b>${name}</b><br /><code>${id}</code></div>`;
            });

        const container = document.getElementById("gids");
        container.innerHTML = data.join("");  // Exibe todos os grupos
    } catch (error) {
        console.error("Erro ao buscar os grupos: ", error);
    }
};

// Função para gerar um delay aleatório entre 60 e 120 segundos
const randomDelay = () => {
    const minDelay = 60000;  // 60 segundos em milissegundos
    const maxDelay = 120000; // 120 segundos em milissegundos
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};

// Função para ler o arquivo .txt e enviar mensagens
const sendForm = async () => {
    const form = document.querySelector("form");

    let spf_msg1 = form.elements["spf_msg1"].value;
    let spf_msg2 = form.elements["spf_msg2"].value;
    let spf_msg3 = form.elements["spf_msg3"].value;
    let rpl_msg = form.elements["rpl_msg"].value;

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecione um arquivo com os números.");
        return;
    }

    // Array com as mensagens para variar entre elas
    const messages = [spf_msg1, spf_msg2, spf_msg3];
    let messageIndex = 0;  // Controla qual mensagem será enviada a seguir

    // Ler o arquivo de números
    const reader = new FileReader();
    reader.onload = async function(event) {
        const content = event.target.result;
        const numbers = content.split("\n").map(line => line.trim()).filter(line => line.length > 0);

        // Verifica se todos os campos estão preenchidos
        if (spf_msg1.length === 0 || spf_msg2.length === 0 || spf_msg3.length === 0 || rpl_msg.length === 0) {
            alert("Os campos de mensagem são obrigatórios.");
            return;
        }

        // Loop para enviar a mensagem para cada número
        for (let i = 0; i < numbers.length; i++) {
            let cid = numbers[i];  // Captura o número (JID)
            if (!cid.includes("@")) cid += "@s.whatsapp.net";

            let data = {
                "chat_id": cid,
                "spoofed_id": cid,  // Suponho que o spoofed_id é o próprio cid
                "message_id": "!",  // Placeholder para o message_id
                "spoofed_message": messages[messageIndex],  // Alterna entre as mensagens
                "reply_message": rpl_msg
            };

            // Atualiza o índice da mensagem (cíclico)
            messageIndex = (messageIndex + 1) % messages.length;

            // Função que faz o envio da mensagem
            const sendMessage = async () => {
                try {
                    const res = await fetch("/send-spoofed", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });

                    if (!res.ok) {
                        throw new Error("Falha ao enviar a mensagem.");
                    }

                    const text = await res.json();
                    alert(`Mensagem enviada para ${cid}`);
                } catch (error) {
                    console.error(`Erro ao enviar a mensagem para ${cid}:`, error);
                    alert(`Erro ao enviar a mensagem para ${cid}`);
                }
            };

            // Gera o delay aleatório e envia a mensagem
            const delayMs = randomDelay();  // Gera o delay aleatório entre 60 e 120 segundos
            await delay(delayMs);  // Aplica o delay aleatório
            await sendMessage();
        }

        alert("Todas as mensagens foram enviadas com sucesso!");
    };

    reader.readAsText(file);
};

// Executa a função de busca dos grupos ao carregar a página
fetchGids();
