import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, WsResponse, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger, UseGuards } from '@nestjs/common';


@WebSocketGateway({
  path: '/online/gateway',
  origins: '*:*',
})
export class EventsGateway implements OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect {

  private readonly onlineRoom = 'oRoom';

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  handleConnection(client: Socket, ...args: any[]) {
    client.join(this.onlineRoom, (error) => {
      if (error) {
        this.logger.error(`join this.onlineRoom ${error}`);
      }
    });

    client.broadcast.to(this.onlineRoom).emit('sys', `${client.id} join online room.`);

    this.logger.log(`Handle Connection ${client.id}`);

    this.onConnentionOrDis();
  }

  private onConnentionOrDis() {
    this.server.of('/').in(this.onlineRoom).clients((error, clients: string[]) => {
      this.logger.log(`Now User Count in room ${this.onlineRoom}: ${clients.length}`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Handle Disconnect ${client.id}`);
    client.leaveAll();
    client.broadcast.to(this.onlineRoom).emit('sys', `${client.id} leave online room.`);

    this.onConnentionOrDis();
  }

  afterInit(server: Server) {
    this.logger.log(`After Init ${server.path()}`);
  }

  // @UseGuards(AuthGuard)
  @SubscribeMessage('auth')
  async handleMessage(client: Socket): Promise<WsResponse<number>> {
    const event = 'events';

    client.broadcast.to(this.onlineRoom).emit(event, 1);

    return await Observable.create((observer: { next: (arg0: WsResponse<number>) => void; }) => {
      const res: WsResponse = {
        event,
        data: 1,
      };
      observer.next(res);
    });
  }
}
