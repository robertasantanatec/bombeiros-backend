import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { IncidentService } from 'src/infra/services/incident.service';
import type { TCreateIncidentDTO, TIncidentResponseDTO } from 'src/infra/dtos/incident.dto';
import { JwtAuthGuard } from 'src/infra/guards/jwt-auth.guard';

@Controller('incidents')
export class IncidentController {
  constructor(private readonly _incidentService: IncidentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: TCreateIncidentDTO): Promise<TIncidentResponseDTO> {
    return this._incidentService.createIncident(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<TIncidentResponseDTO[]> {
    return this._incidentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TIncidentResponseDTO | null> {
    return this._incidentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<TCreateIncidentDTO>,
  ): Promise<TIncidentResponseDTO> {
    return this._incidentService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this._incidentService.remove(id);
  }
}
