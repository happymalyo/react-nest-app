import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Public()
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.articlesService.getAllArticles();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.getArticleById(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.updateArticle(+id, updateArticleDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.deleteArticle(+id);
  }
}
