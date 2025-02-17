import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async getLocation(postId: string) {
    const location = await this.prisma.location.findFirst({
      where: { postId: postId },
    });

    if (!location) {
      throw new NotFoundException('Ubicación no encontrada para este post');
    }

    return location;
  }
  async getAllLocations() {
    const locations = await this.prisma.location.findMany({
      include: { post: true },
    });

    if (locations.length === 0) {
      throw new NotFoundException('No se encontraron ubicaciones registradas');
    }

    return locations;
  }
}
