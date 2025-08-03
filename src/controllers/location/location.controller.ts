// src/controllers/location/location.controller.ts
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { LocationService } from 'src/services/location/location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // Endpoint to create the location index
  @Post('create/index')
  async createSchema() {
    return await this.locationService.createLocationIndexIfNotExists();
  }

  // Endpoint to update a location by ID
  @Put('update/:id')
  async locationUpdate(@Param('id') locationId: string, @Body() updateData: any) {
    const result = await this.locationService.locationUpdate(locationId, updateData);
    return {
      message: 'Location updated successfully',
      data: result,
    };
  }


}
