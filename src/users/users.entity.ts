import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id); // 방금 삽입한 엔터티 참조
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id); // 방금 업데이트한 엔터티 참조
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id); // 방금 삭제한 엔터티 참조
  }
}
