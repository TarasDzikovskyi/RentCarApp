import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Booking} from "../../booking/entities/booking.entity";
import {Reviews} from "../../review/entities/review.entity";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Car {
    @PrimaryGeneratedColumn({name: 'car_id'})
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    class: string;

    @Column()
    drive: string;

    @Column()
    fuel_type: string;

    @Column()
    transmission: string;

    @Column()
    year: number;

    @Column()
    image?: string;

    @Column({ nullable: false, default: 10 })
    price: number;

    @Column({ nullable: false, default: 4 })
    capacity: number;

    @OneToMany(() => Booking, (booking) => booking.car, {onDelete: "CASCADE"})
    booking: Booking[];

    @OneToMany(() => Reviews, (review) => review.car, {onDelete: "CASCADE"})
    review: Reviews[];

    @ManyToMany(() => User, user => user.favorites)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
