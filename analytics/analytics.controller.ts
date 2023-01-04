import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AnalyticsService} from './analytics.service';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {OverviewData, Overview} from './dto/analytics.dto';

@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsService: AnalyticsService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('overview')
    overview(@Req() request): Promise<OverviewData> {
        const userId = request.user.id;
        return this.analyticsService.overview(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('analytics')
    analytics(@Req() request): Promise<Overview> {
        const userId = request.user.id;
        return this.analyticsService.analytics(userId);
    }
}
