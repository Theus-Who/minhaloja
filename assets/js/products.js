/* js/products.js */

const productsData = {
  "products": [
    {
      "id": "1",
      "title": "Smartphone Top de Linha 5G",
      "description": "Um smartphone poderoso com câmera de 108MP, tela AMOLED de 120Hz e processador super-rápido.",
      "shortDescription": "Smartphone 5G com câmera profissional e tela de alta performance.",
      "price": 3499.99,
      "rating": 4.8,
      "category": "Eletrônicos",
      "stock": 50,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Smartphone+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Smartphone+2",
        "https://via.placeholder.com/600x600/d0d0d0/333?text=Smartphone+3"
      ]
    },
    {
      "id": "2",
      "title": "Fone de Ouvido sem Fio com Cancelamento de Ruído",
      "description": "Desfrute de sua música sem distrações. Bateria de longa duração e som de alta fidelidade.",
      "shortDescription": "Fone de ouvido com cancelamento de ruído e áudio premium.",
      "price": 799.00,
      "rating": 4.5,
      "category": "Acessórios",
      "stock": 120,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Fone+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Fone+2"
      ]
    },
    {
      "id": "3",
      "title": "Notebook Ultrabook Slim",
      "description": "Leve e potente. Ideal para trabalho e estudos, com 16GB de RAM e 512GB SSD.",
      "shortDescription": "Notebook ultrabook com design elegante e alta performance.",
      "price": 5899.50,
      "rating": 4.7,
      "category": "Eletrônicos",
      "stock": 30,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Notebook+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Notebook+2"
      ]
    },
    {
      "id": "4",
      "title": "Cafeteira Expresso Automática",
      "description": "Prepare seu café favorito com um toque. Moedor de grãos integrado e bico para vaporizar leite.",
      "shortDescription": "Cafeteira automática para um café perfeito a qualquer hora.",
      "price": 1250.00,
      "rating": 4.9,
      "category": "Casa e Cozinha",
      "stock": 75,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Cafeteira+1"
      ]
    },
    {
      "id": "5",
      "title": "Smart TV 4K 55 Polegadas",
      "description": "Imagens vibrantes e som imersivo. Sistema operacional inteligente com acesso a todos os apps de streaming.",
      "shortDescription": "Smart TV 4K com tela gigante e recursos inteligentes.",
      "price": 2899.00,
      "rating": 4.6,
      "category": "Eletrônicos",
      "stock": 40,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=TV+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=TV+2"
      ]
    },
    {
      "id": "6",
      "title": "Relógio Inteligente Esportivo",
      "description": "Monitore sua saúde e atividades físicas com precisão. Bateria de longa duração e design elegante.",
      "shortDescription": "Smartwatch com monitoramento de saúde completo e GPS.",
      "price": 399.90,
      "rating": 4.4,
      "category": "Acessórios",
      "stock": 90,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Relogio+1"
      ]
    },
    {
      "id": "7",
      "title": "Cadeira Gamer Ergonômica",
      "description": "Conforto máximo para longas sessões de jogo. Ajuste de altura, inclinação e apoio de braço.",
      "shortDescription": "Cadeira ergonômica para gamers, com design robusto.",
      "price": 950.00,
      "rating": 4.7,
      "category": "Móveis",
      "stock": 25,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Cadeira+1"
      ]
    },
    {
      "id": "8",
      "title": "Kit de Potes de Vidro Herméticos (6 peças)",
      "description": "Mantenha seus alimentos frescos por mais tempo. Potes de vidro borossilicato de alta resistência.",
      "shortDescription": "Potes de vidro herméticos, ideais para armazenar alimentos.",
      "price": 149.90,
      "rating": 4.9,
      "category": "Casa e Cozinha",
      "stock": 200,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Potes+1"
      ]
    },
    {
      "id": "9",
      "title": "Máquina de Lavar e Secar Roupas",
      "description": "Lave e seque suas roupas em um único ciclo. Capacidade de 10kg, motor silencioso e economia de energia.",
      "shortDescription": "Máquina de lavar e secar, prática e eficiente.",
      "price": 2999.00,
      "rating": 4.5,
      "category": "Eletrodomésticos",
      "stock": 15,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Maquina+1"
      ]
    },
    {
      "id": "10",
      "title": "Controle sem Fio para Console",
      "description": "Controle ergonômico com bateria recarregável e resposta tátil avançada. Compatível com os principais consoles.",
      "shortDescription": "Controle sem fio para games, com alta precisão e conforto.",
      "price": 249.00,
      "rating": 4.8,
      "category": "Games",
      "stock": 80,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Controle+1"
      ]
    },
    {
      "id": "11",
      "title": "Luminária de Mesa LED Flexível",
      "description": "Iluminação ajustável para leitura ou trabalho. Design moderno e economia de energia.",
      "shortDescription": "Luminária de mesa com luz LED e braço flexível.",
      "price": 89.90,
      "rating": 4.6,
      "category": "Casa e Cozinha",
      "stock": 150,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Luminaria+1"
      ]
    },
    {
      "id": "12",
      "title": "Tênis de Corrida Profissional",
      "description": "Tecnologia de amortecimento avançada para o máximo desempenho na corrida. Leve e respirável.",
      "shortDescription": "Tênis de corrida com amortecimento de alta performance.",
      "price": 450.00,
      "rating": 4.7,
      "category": "Esportes",
      "stock": 60,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Tenis+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Tenis+2"
      ]
    },
    {
      "id": "13",
      "title": "Livro: A Arte de Programar",
      "description": "Um guia completo para iniciantes e avançados na arte da programação. Exemplos práticos e exercícios.",
      "shortDescription": "Guia de programação com exemplos práticos.",
      "price": 75.00,
      "rating": 4.9,
      "category": "Livros",
      "stock": 300,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Livro+1"
      ]
    },
    {
      "id": "14",
      "title": "Mochila para Notebook de 15.6\"",
      "description": "Compartimentos acolchoados para notebook, tablet e acessórios. Material resistente à água.",
      "shortDescription": "Mochila durável e estilosa para notebooks de até 15.6\".",
      "price": 180.00,
      "rating": 4.5,
      "category": "Acessórios",
      "stock": 110,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Mochila+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Mochila+2"
      ]
    },
    {
      "id": "15",
      "title": "Câmera Digital Profissional",
      "description": "Capture momentos incríveis com alta resolução e diversos modos de fotografia. Lente intercambiável.",
      "shortDescription": "Câmera profissional com sensor de alta resolução.",
      "price": 4200.00,
      "rating": 4.8,
      "category": "Eletrônicos",
      "stock": 10,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Camera+1",
        "https://via.placeholder.com/600x600/e0e0e0/333?text=Camera+2"
      ]
    },
    {
      "id": "16",
      "title": "Headset Gamer com Microfone",
      "description": "Som surround 7.1 e microfone com cancelamento de ruído. Conforto total para longas jogatinas.",
      "shortDescription": "Headset gamer com som de alta qualidade e microfone retrátil.",
      "price": 320.00,
      "rating": 4.6,
      "category": "Games",
      "stock": 70,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Headset+1"
      ]
    },
    {
      "id": "17",
      "title": "Panela de Pressão Elétrica Digital",
      "description": "Cozinhe de forma rápida e segura. Vários programas de cozimento pré-definidos e timer digital.",
      "shortDescription": "Panela de pressão elétrica, prática e segura para o dia a dia.",
      "price": 450.00,
      "rating": 4.9,
      "category": "Casa e Cozinha",
      "stock": 50,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Panela+1"
      ]
    },
    {
      "id": "18",
      "title": "Kit de Ferramentas Completo",
      "description": "Um kit essencial para pequenos reparos em casa. Contém martelo, chaves de fenda, alicate e mais.",
      "shortDescription": "Kit de ferramentas com as peças essenciais para o lar.",
      "price": 120.00,
      "rating": 4.4,
      "category": "Ferramentas",
      "stock": 85,
      "images": [
        "https://via.placeholder.com/600x600/f0f0f0/333?text=Ferramentas+1"
      ]
    }
  ]
};