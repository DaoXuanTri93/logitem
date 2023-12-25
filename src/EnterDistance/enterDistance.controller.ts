
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { EnterDistanceService } from "./enterDistance.service";
import { AuthGuard } from "src/auth/authGuard";

@Controller('driver')
export class EnterDistanceController {
    constructor(private readonly enterDistanceService: EnterDistanceService) { }

    @UseGuards(AuthGuard)
    @Post('createEnterDistance')
    createEnterDistance(@Body() body: any, @Request() req) {
        const userNameId = req.user.sub;
        return this.enterDistanceService.createEnterDistance(body, userNameId)
    }

    @UseGuards(AuthGuard)
    @Post('updateEnterDistance')
    updateEnterDistance(@Body() body: any, @Request() req) {
        const userNameId = req.user.sub;
        return this.enterDistanceService.updateEnterDistance(body, userNameId)
    }

    @UseGuards(AuthGuard)
    @Get('findOneEnterDistance')
    async findOneEnterDistance(@Request() req) {
        const userNameId = req.user.sub;
        return (await this.enterDistanceService.findOneEnterDistance(userNameId)).convertEnterDistance();
    }

}