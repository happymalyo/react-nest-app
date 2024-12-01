import { IsEmail, IsString, MinLength } from 'class-validator';

// For better exprience, this verfication has handled from Frented React.
export class CreateUserDto {
  @IsEmail({}, { message: 'Mette de valide adresse email' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Mot de passe doit être au moin 8 caractère' })
  password: string;
}
