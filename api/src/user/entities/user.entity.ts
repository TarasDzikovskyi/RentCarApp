import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";
import {Reviews} from "../../review/entities/review.entity";
import {Car} from "../../car/entities/car.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: false, default: '' })
    image: string;

    @Column()
    password: string;

    @OneToMany(() => Booking, (booking) => booking.user, {onDelete: "CASCADE"})
    booking: Booking[];

    @OneToMany(() => Reviews, (review) => review.user, {onDelete: "CASCADE"})
    review: Reviews[];

    @ManyToMany(() => Car,{ eager: true })
    @JoinTable()
    favorites: Car[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date


}
