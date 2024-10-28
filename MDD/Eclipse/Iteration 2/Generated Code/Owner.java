/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Owner</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Owner#getPainting <em>Painting</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.Owner#getGallery <em>Gallery</em>}</li>
 * </ul>
 *
 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getOwner()
 * @model
 * @generated
 */
public interface Owner extends User {
	/**
	 * Returns the value of the '<em><b>Painting</b></em>' containment reference list.
	 * The list contents are of type {@link com.garagu.emf.fillthevoid.model.FillTheVoid.Painting}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Painting</em>' containment reference list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getOwner_Painting()
	 * @model containment="true"
	 * @generated
	 */
	EList<Painting> getPainting();

	/**
	 * Returns the value of the '<em><b>Gallery</b></em>' containment reference list.
	 * The list contents are of type {@link com.garagu.emf.fillthevoid.model.FillTheVoid.Gallery}.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Gallery</em>' containment reference list.
	 * @see com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage#getOwner_Gallery()
	 * @model containment="true"
	 * @generated
	 */
	EList<Gallery> getGallery();

} // Owner
