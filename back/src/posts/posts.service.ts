import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { isUUID } from 'class-validator';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    const postsArray = [];
    let total = 0;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if(!user) throw new NotFoundException("el usuario no existe")

        


    const newPost = {...createPostDto, userId: user.id} 

//    const createPost = this.prisma.post.create({data:newPost})

    // if (!isUUID(userId)) throw new HttpException('El UUID no es válido', 404);

    // const userFound = await this.prisma.user.findUnique({
    //   where: { id: userId },
    // });
    // if (!userFound) throw new HttpException('El usuario no existe', 404);

    // const post = await this.prisma.post.create({
    //   data: {
    //     title,
    //     description,
    //     petType,
    //     dateLost,
    //     location,
    //     contactInfo,
    //     photoUrl,
    //     userId,
    //   },
    // });
    // return post;


    // { userId: string;
    //      title: string; 
    //      description: string; 
    //      petType: string; 
    //      dateLost: Date; 
    //      location: string;
    //       contactInfo: string
    //       ; photoUrl?: string; }


  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new HttpException(`Post con ID ${id} no encontrado`, 404);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new HttpException(`Post con ID ${id} no encontrado`, 404);
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });

    return {
      message: `Post con ID ${id} actualizado correctamente`,
      updatedPost,
    };
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.delete({
      where: { id },
    });

    return { message: `Post con ID ${id} eliminado correctamente` };
  }
}
