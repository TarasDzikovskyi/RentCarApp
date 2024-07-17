import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Car} from "../../car/entities/car.entity";


@Entity()
export class Booking {
    @PrimaryGeneratedColumn({name: 'booking_id'})
    id: number;

    @Column()
    start_city: string;

    @Column()
    end_city: string;

    @Column()
    start_date: number;

    @Column()
    end_date: number;

    @Column()
    price: number;

    @ManyToOne(() => User, user => user.booking)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Car, car => car.booking)
    @JoinColumn({name: 'car_id'})
    car: Car;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
