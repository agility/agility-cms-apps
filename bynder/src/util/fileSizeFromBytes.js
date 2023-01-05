import numeral from 'numeral'
export default function fileSizeFromBytes(size) {

	var sizeInt = parseInt(size);
	if (isNaN(sizeInt)) return size;

	if (size > 1024 * 1024) {
		return numeral(size / 1024 / 1024).format('0,0.0') + "mb";
	}

	return numeral(size / 1024).format('0,0.0') + "kb";
}