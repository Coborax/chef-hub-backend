import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentsService: CommentsService) {}

  @SubscribeMessage('createComment')
  create(@MessageBody() createCommentDto: CreateCommentDto) {
    this.commentsService
      .create(createCommentDto)
      .then((newComment) =>
        this.server.emit('post:' + newComment.post.id, newComment),
      );
  }
}
