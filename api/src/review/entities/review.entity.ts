import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Car} from "../../car/entities/car.entity";


@Entity()
export class Reviews {
    @PrimaryGeneratedColumn({name: 'review_id'})
    id: number;

    @Column()
    review: string;

    @Column()
    rating: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Car, (car) => car.id)
    @JoinColumn({name: 'car_id'})
    car: Car;

    @CreateDateColumn()
    createdAt: Date;
}
