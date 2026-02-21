
# Política de Privacidade – Tarot Online

Última atualização: [inserir data]

A presente Política de Privacidade descreve como o **Tarot Online** coleta, utiliza, compartilha e protege dados pessoais dos usuários, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).

Ao utilizar o site **seusite.com**, você declara estar ciente das práticas descritas nesta Política.

## 1. Sobre o Tarot Online

O **Tarot Online** é um aplicativo digital que oferece leitura de tarot com 3 cartas (Passado, Presente e Futuro), com interpretação gerada por inteligência artificial e envio do resultado por e-mail.

O serviço funciona mediante pagamento único por leitura (R$ 9,90) ou pacote promocional (R$ 24,90).

O aplicativo não exige cadastro tradicional com criação de conta e senha.

## 2. Quais dados coletamos

Abaixo explicamos quais dados são coletados, quando e para qual finalidade.

### 2.1 E-mail

-   Coletado pelo Stripe durante o checkout
    
-   Armazenado temporariamente na sessão após confirmação do pagamento
    

Finalidade:

-   Enviar a leitura por e-mail
    
-   Vincular a leitura à compra realizada
    

### 2.2 Dados de pagamento

-   Coletados diretamente pelo Stripe (cartão de crédito, dados financeiros, etc.)
    
-   O Tarot Online não recebe, não armazena e não processa dados de cartão
    

Finalidade:

-   Processamento do pagamento
    

### 2.3 Cookie de sessão (tarot_session)

Após a confirmação da compra, o sistema gera um cookie de sessão chamado **tarot_session**, com as seguintes características:

-   httpOnly
    
-   Secure (em produção)
    
-   SameSite Lax
    
-   Validade de até 1 ano
    
-   Criptografado com tecnologia iron-session
    

Esse cookie pode conter:

-   Número de leituras restantes
    
-   Lista dos últimos IDs de sessões Stripe já creditadas (até 30 registros)
    
-   E-mail do comprador
    

Finalidade:

-   Manter controle de créditos
    
-   Evitar crédito duplo de pagamento
    
-   Permitir envio da leitura por e-mail
    

### 2.4 Cartas sorteadas

Quando o usuário realiza uma leitura:

-   O aplicativo envia apenas os nomes e significados das 3 cartas sorteadas para a API de interpretação
    
-   Não é enviado e-mail
    
-   Não é enviada pergunta do usuário
    
-   Não é enviado texto livre
    

Finalidade:

-   Gerar a interpretação automática por inteligência artificial
    

O usuário não fornece pergunta personalizada ou texto próprio ao sistema.

## 3. Compartilhamento de dados com terceiros

Para funcionamento do serviço, alguns dados podem ser compartilhados com os seguintes prestadores:

### 3.1 Stripe

Dados compartilhados:

-   Dados de pagamento
    
-   E-mail no checkout
    

Finalidade:

-   Processamento de pagamento
    

Política de Privacidade:  
[https://stripe.com/br/privacy](https://stripe.com/br/privacy)

### 3.2 OpenAI

Dados compartilhados:

-   Nomes das 3 cartas sorteadas
    
-   Significados das cartas
    

Não são compartilhados:

-   E-mail
    
-   Dados financeiros
    
-   Identificação pessoal do usuário
    

Finalidade:

-   Geração da interpretação textual da leitura
    

### 3.3 MailerSend

Dados compartilhados:

-   E-mail do destinatário
    
-   Cartas sorteadas
    
-   Texto da leitura gerado
    

Finalidade:

-   Envio do e-mail com a leitura
    

### 3.4 Google Fonts

Ao carregar fontes tipográficas, o endereço IP pode ser acessado pelo Google.

Política:  
[https://policies.google.com/privacy](https://policies.google.com/privacy)

Finalidade:

-   Exibição adequada das fontes no site
    

### 3.5 CDN (jsDelivr)

Requisições podem ser feitas para carregar imagens das cartas de tarot.

Finalidade:

-   Carregamento eficiente de imagens
    

### 3.6 Hospedagem

O site pode estar hospedado em provedores como Vercel ou similares, que podem gerar logs técnicos de acesso (IP, data, hora e navegador) para fins de segurança e estabilidade.

## 4. Como armazenamos os dados

O Tarot Online não mantém banco de dados próprio com histórico permanente de usuários.

Os dados são armazenados da seguinte forma:

### 4.1 Sessão no servidor

Armazena temporariamente:

-   Número de leituras restantes
    
-   Lista dos últimos 30 IDs de sessões Stripe creditadas
    
-   E-mail do comprador
    

### 4.2 Cookie criptografado

O cookie tarot_session contém as mesmas informações acima, criptografadas.

Não armazenamos:

-   Dados de cartão
    
-   Histórico permanente de leituras
    
-   Perguntas personalizadas
    

## 5. Fluxo de dados do serviço

O funcionamento do serviço ocorre da seguinte maneira:

1.  Usuário realiza compra via Stripe (checkout).
    
2.  O sistema consulta o status do pagamento via Stripe API.
    
3.  E-mail e créditos são salvos em cookie de sessão criptografado.
    
4.  Usuário realiza leitura.
    
5.  O app envia as cartas sorteadas para a OpenAI.
    
6.  Recebe o texto interpretado.
    
7.  Envia cartas e interpretação para o MailerSend.
    
8.  O e-mail é entregue ao usuário.
    

## 6. Bases legais (LGPD)

O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:

-   Execução de contrato: para fornecer a leitura adquirida
    
-   Interesse legítimo: para funcionamento técnico do sistema e prevenção de fraudes (ex.: evitar crédito duplo)
    

## 7. Direitos do titular dos dados

Nos termos da LGPD, você pode solicitar:

-   Confirmação da existência de tratamento
    
-   Acesso aos dados
    
-   Correção de dados incompletos ou desatualizados
    
-   Exclusão de dados (quando aplicável)
    
-   Portabilidade
    
-   Informação sobre compartilhamento
    
-   Revogação de consentimento (quando aplicável)
    

Para exercer seus direitos, entre em contato pelo e-mail:

privacidade@seusite.com

Responderemos em prazo razoável, conforme exigido pela legislação.

## 8. Retenção de dados

-   O cookie de sessão expira em até 1 ano.
    
-   IDs de sessões Stripe são armazenados apenas para evitar crédito duplicado (até os 30 mais recentes).
    
-   Não mantemos histórico permanente de leituras no aplicativo.
    

Dados mantidos por terceiros seguem as políticas próprias de cada fornecedor.

## 9. Segurança das informações

Adotamos medidas técnicas e administrativas adequadas para proteger os dados, incluindo:

-   Uso de HTTPS
    
-   Cookies httpOnly
    
-   Criptografia de sessão
    
-   Não armazenamento de dados de cartão
    
-   Uso de provedores confiáveis
    

Apesar dos esforços, nenhum sistema é totalmente imune a riscos. Recomendamos que o usuário também mantenha seus dispositivos protegidos.

## 10. Público-alvo e idade mínima

O serviço é destinado a maiores de 18 anos.

Não coletamos intencionalmente dados de menores de idade. Caso identifiquemos coleta indevida, os dados poderão ser excluídos.

## 11. Alterações nesta Política

Esta Política pode ser atualizada periodicamente.

Alterações relevantes poderão ser comunicadas por:

-   Aviso na página inicial
    
-   Comunicação por e-mail, quando aplicável
    

Recomendamos revisão periódica deste documento.

## 12. Resumo simplificado

De forma simples:

-   Você paga pelo Stripe.
    
-   Nós usamos seu e-mail apenas para enviar sua leitura.
    
-   Não armazenamos dados de cartão.
    
-   Não guardamos histórico permanente das suas leituras.
    
-   Usamos inteligência artificial apenas com as cartas sorteadas.
    
-   Você pode solicitar informações ou exclusão a qualquer momento.
    

## 13. Contato

Em caso de dúvidas sobre privacidade ou LGPD, entre em contato:

E-mail: privacidade@seusite.com  
Site: [https://seusite.com](https://seusite.com)

Estamos comprometidos com a transparência e o respeito aos seus dados pessoais.