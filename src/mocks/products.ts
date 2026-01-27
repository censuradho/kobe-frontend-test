import type { ChatEvent, ProductSuggestion } from "@/models/chat";

export const mockProducts: ProductSuggestion['products'] = [
  {
    id: 'p1',
    title: 'Anel Solitário Ouro 18k com 20pts de Diamante Anne',
    price: 4500,
    originalPrice: 5000,
    image: {
      src: '/img/1.png',
      alt: 'Anel Solitário Ouro 18k com 20pts de Diamante Anne'
    },
    rating: 3.2,
    badge: 'Mais Vendido'
  },
  {
    id: 'p2',
    title: 'Anel Solitário Ouro Branco com 10pts de Diamante Bella',
    price: 5200,
    image: {
      src: '/img/2.png',
      alt: 'Anel Solitário Ouro Branco com 10pts de Diamante Bella',
    },
    rating: 4.8,
  },
  {
    id: 'p3',
    title: 'Anel Solitário Ouro 18k com 80pts de Diamante Elle',
    price: 4999,
    image: {
      src: '/img/3.png',
      alt: 'Anel Solitário Ouro 18k com 80pts de Diamante Elle',
    },
    rating: 2.8,
  }
]

export const mockChat: ChatEvent[] = [
  {
    id: 'user-1',
    type: 'user',
    text: 'Olá, estou procurando por um anel solitário em ouro amarelo ou branco com diamantes para um pedido de casamento. Quero opções que custem até cinco mil reais.',
    timestamp: new Date().getTime(),
    delay: 100,
  },
  {
    id: 'typing-1',
    type: 'typing',
    timestamp: new Date().getTime(),
    delay: 1200,
  },
  {
    id: 'agent-1',
    type: 'agent',
    text: 'Claro, aqui estão algumas sugestões de anéis solitário com as características e dentro do valor que você solicitou:',
    timestamp: new Date().getTime(),
    delay: 800,
  },
  {
    id: 'products-1',
    type: 'products',
    products: mockProducts,
    timestamp: new Date().getTime(),
    delay: 2000,
  },
  {
    id: 'agent-2',
    type: 'agent',
    text: 'Temos também novidades em anéis com design exclusivo. Gostaria de ver?',
    timestamp: new Date().getTime(),
    delay: 1500,
  },
  {
    id: 'user-2',
    type: 'user',
    text: 'Sim, mostre as novidades!',
    timestamp: new Date().getTime(),
    delay: 0,
  },
  {
    id: 'typing-2',
    type: 'typing',
    timestamp: new Date().getTime(),
    delay: 1000,
  },
  {
    id: 'agent-3',
    type: 'agent',
    text: 'Esses são os lançamentos mais recentes da nossa coleção:',
    timestamp: new Date().getTime(),
    delay: 900,
  },
  {
    id: 'products-2',
    type: 'products',
    products: [
      {
        id: 'p4',
        title: 'Anel Solitário Ouro Rosé com 30pts de Diamante Ruby',
        price: 4700,
        image: {
          src: '/img/4.png',
          alt: 'Anel Solitário Ouro Rosé com 30pts de Diamante Ruby',
        },
        rating: 4.5,
        badge: 'Lançamento'
      },
      {
        id: 'p5',
        title: 'Anel Solitário Ouro Branco com 50pts de Diamante Tessa',
        price: 4990,
        image: {
          src: '/img/5.png',
          alt: 'Anel Solitário Ouro Branco com 50pts de Diamante Tessa',
        },
        rating: 4.9,
      }
    ],
    timestamp: new Date().getTime(),
    delay: 1800,
  },
  {
    id: 'agent-4',
    type: 'agent',
    text: 'Gostaria também de ver opções de alianças de casamento?',
    timestamp: new Date().getTime(),
    delay: 1500,
  },
  {
    id: 'user-3',
    type: 'user',
    text: 'Pode me dar mais informações sobre o anel em ouro branco Tessa?',
    timestamp: new Date().getTime(),
    delay: 0,
  },
  {
    id: 'typing-3',
    type: 'typing',
    timestamp: new Date().getTime(),
    delay: 1100,
  },
  {
    id: 'agent-5',
    type: 'agent',
    text: 'O anel Tessa é confeccionado em ouro branco 18k e possui um diamante central de 15pts. Ele é uma peça elegante e muito procurada para pedidos de casamento.',
    timestamp: new Date().getTime(),
    delay: 900,
  },
  {
    id: 'user-4',
    type: 'user',
    text: 'Qual o prazo de entrega para esse modelo?',
    timestamp: new Date().getTime(),
    delay: 0,
  },
  {
    id: 'typing-4',
    type: 'typing',
    timestamp: new Date().getTime(),
    delay: 1300,
  },
  {
    id: 'agent-6',
    type: 'agent',
    text: 'O prazo de entrega para o anel Tessa é de até 7 dias úteis para todo o Brasil.',
    timestamp: new Date().getTime(),
    delay: 700,
  },
  {
    id: 'user-5',
    type: 'user',
    text: 'Ótimo, obrigado pelas informações!',
    timestamp: new Date().getTime(),
    delay: 0,
  },
  {
    id: 'typing-5',
    type: 'typing',
    timestamp: new Date().getTime(),
    delay: 1300,
  },
  {
    id: 'agent-7',
    type: 'agent',
    text: 'Disponha! Se precisar de mais alguma coisa, estou à disposição.',
    timestamp: new Date().getTime(),
    delay: 600,
  }
]