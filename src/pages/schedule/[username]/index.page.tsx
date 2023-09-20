import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/src/lib/prisma'
import { ScheduleForm } from './ScheduleForm/index.page'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

// paginas estaticas com parâmetros dinamicos (url) devem ter um getStaticPaths pois
// ao rodar run build todas as paginas estaticas sao geradas mas ainda não se sabe o parâmetro para gerar a mesma
// getStaticProps informa ao Next.js quais caminhos (URLs) devem ser pré-renderizados no momento da construção do aplicativo.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // nao gera nenhuma pagina estatica no momento da build e sim de acordo com acessos da pagina com o parâmetro
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
