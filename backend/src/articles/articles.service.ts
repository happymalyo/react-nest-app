import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // Get all articles
  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  // Get an article by ID
  async getArticleById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id_article: id });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  // Create a new article
  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(newArticle);
  }

  // Update an article by ID
  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.getArticleById(id);
    Object.assign(article, updateArticleDto);
    return this.articleRepository.save(article);
  }

  async deleteArticle(id: number): Promise<void> {
    const article = await this.getArticleById(id);
    await this.articleRepository.remove(article);
  }
}
