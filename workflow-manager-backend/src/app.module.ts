import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkflowController } from './app/workflow/workflow.controller';
import { WorkflowModule } from './app/workflow/worflow.module';
import { WorkflowService } from './app/workflow/workflow.service';
import { ConfigModule } from '@nestjs/config';
import {
  Workflow,
  WorkflowSchema,
} from './app/workflow/schema/workflow.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // * Pour enlever les warnings
      useUnifiedTopology: true,
    }),
    WorkflowModule,
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
    ]),
  ],
  controllers: [AppController, WorkflowController],
  providers: [AppService, WorkflowService],
})

// * To apply a MiddleWare
// * https://docs.nestjs.com/middleware
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(isAuth)
//       .forRoutes('cats');
//   }
// }
export class AppModule {}
