import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app'; 
import Timestamp = firebase.firestore.Timestamp;

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: Timestamp): Date {
    return timestamp?.toDate() || null;
  }
}
