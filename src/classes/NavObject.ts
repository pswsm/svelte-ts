export class NavbarObject {
	private _link: string;
	private _text: string;

	constructor(link: string, text: string) {
		this._link = link;
		this._text = text;
	}

	/**
	 * get link
	 */
	public get link() {
		return this._link;
	}

	/**
	 * get text
	 */
	public get text() {
		return this._text;
	}
}
