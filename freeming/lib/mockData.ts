interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Vingadores: Ultimato",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2019-04-26",
    description:
      "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas devido aos esforços do Titã Louco, Thanos. Com a ajuda de aliados remanescentes, os Vingadores devem se reunir mais uma vez a fim de desfazer as ações de Thanos e restaurar a ordem no universo de uma vez por todas.",
    embed_url: "https://www.youtube.com/embed/TcMBFSGVi1c",
  },
  {
    id: "2",
    title: "Homem-Aranha: Sem Volta Para Casa",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2021-12-17",
    description:
      "Peter Parker tem sua identidade secreta revelada e pede ajuda ao Doutor Estranho. Quando um feitiço para reverter o evento não sai como esperado, inimigos perigosos de outros mundos começam a aparecer, forçando Peter a descobrir o que realmente significa ser o Homem-Aranha.",
    embed_url: "https://www.youtube.com/embed/JfVOs4VSpmA",
  },
  {
    id: "3",
    title: "Top Gun: Maverick",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-05-27",
    description:
      'Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete "Maverick" Mitchell está onde pertence, empurrando os limites como um piloto de testes corajoso e esquivando-se do avanço na classificação que o aterraria.',
    embed_url: "https://www.youtube.com/embed/giXco2jaZ_4",
  },
  {
    id: "4",
    title: "Avatar: O Caminho da Água",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-12-16",
    description:
      "Jake Sully vive com sua nova família formada no planeta de Pandora. Quando uma ameaça familiar retorna para terminar o que começou anteriormente, Jake deve trabalhar com Neytiri e o exército da raça Na'vi para proteger seu planeta.",
    embed_url: "https://www.youtube.com/embed/d9MyW72ELq0",
  },
  {
    id: "5",
    title: "Pantera Negra: Wakanda Para Sempre",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-11-11",
    description:
      "A rainha Ramonda, Shuri, M'Baku, Okoye e as Dora Milaje lutam para proteger sua nação das potências mundiais intervenientes após a morte do rei T'Challa. Enquanto os wakandanos se esforçam para abraçar seu próximo capítulo, os heróis devem se unir com a ajuda de War Dog Nakia e Everett Ross.",
    embed_url: "https://www.youtube.com/embed/_Z3QKkl1WyM",
  },
  {
    id: "6",
    title: "Doutor Estranho no Multiverso da Loucura",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-05-06",
    description:
      "O Doutor Estranho desperta o Multiverso e empurra seus limites mais longe do que nunca. Viaje para o desconhecido com o Doutor Estranho, que, com a ajuda de aliados místicos tanto antigos quanto novos, atravessa as realidades alternativas alucinantes e perigosas do Multiverso.",
    embed_url: "https://www.youtube.com/embed/aWzlQ2N6qqg",
  },
  {
    id: "7",
    title: "Thor: Amor e Trovão",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-07-08",
    description:
      "Thor embarca em uma jornada diferente de tudo que já enfrentou – uma busca pela paz interior. Mas sua aposentadoria é interrompida por um assassino galáctico conhecido como Gorr, o Carniceiro dos Deuses, que busca a extinção dos deuses.",
    embed_url: "https://www.youtube.com/embed/Go8nTmfrQd8",
  },
  {
    id: "8",
    title: "Minions: A Origem de Gru",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-07-01",
    description:
      "Na década de 1970, Gru está crescendo nos subúrbios. Um fã dos supervilões e especialmente de um grupo conhecido como Vicious 6, Gru trama um plano para se tornar malvado o suficiente para se juntar a eles.",
    embed_url: "https://www.youtube.com/embed/ZqUbCQpANkE",
  },
  {
    id: "9",
    title: "Jurassic World: Domínio",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-06-10",
    description:
      "Quatro anos após o fechamento do parque temático Jurassic World, os dinossauros agora vivem e caçam ao lado dos humanos em todo o mundo. Isso leva a um novo equilíbrio que afetará o futuro da humanidade e dos dinossauros.",
    embed_url: "https://www.youtube.com/embed/6c7c8d3b1a4",
  },
  {
    id: "10",
    title: "Sonic 2: O Filme",
    poster_url: "/placeholder.svg?height=450&width=300",
    release_date: "2022-04-08",
    description:
      "Sonic está pronto para provar que ele tem o que é preciso para ser um verdadeiro herói. Ele se junta a Tails e Knuckles para impedir que o Dr. Robotnik encontre uma esmeralda poderosa que pode destruir civilizações.",
    embed_url: "https://www.youtube.com/embed/5vQh0e1kX6E",
  },
]

export function getFeaturedMovies(): Movie[] {
  return mockMovies.slice(0, 5)
}

export function getPopularMovies(): Movie[] {
  return mockMovies.slice(2, 7)
}

export function getRecentMovies(): Movie[] {
  return mockMovies.slice(3, 8)
}

export function getAllMovies(): Movie[] {
  return mockMovies
}
