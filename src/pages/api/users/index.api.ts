import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  } // rever por que prisma aceita qualquer método na rota (prisma ou next?)

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  }) // verifica se o usuário ja está cadastrado no banco de dados

  if (userExists) {
    return res.status(400).json({
      message: 'Username already exists',
    })
  } // retorna erro caso o usuário ja exista

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  }) // cria o usuário no banco de dados

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  }) // cria um cookie com o userId

  return res.status(201).json(user)
}
