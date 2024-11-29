import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id_article: number;

  @Column({ type: 'varchar', length: 255 })
  nom_article: string;

  @Column({ type: 'int' })
  quantity: number;
}
