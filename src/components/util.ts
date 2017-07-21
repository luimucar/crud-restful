export class Util {
    public static sortBy(field : string) {
        return (left, right): number => {
            if (left[field] < right[field]) {
                return -1;
            } else if (left[field] > right[field]) {
                return 1;
            }
            return 0;
        }
    }
}